const Input = require('../model/Input');
const Product = require('../model/Product');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { format } = require('@fast-csv/format');
const { v4: uuidv4 } = require('uuid');

exports.uploadAndMatchCSV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded. Use form-data with key "file".' });
        }

        const filePath = req.file.path;
        const parsedInputs = [];

        // 1. Parse the CSV
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                // Only include rows with valid Category and SUM_of_account2
                if (row.Category && row.SUM_of_account2) {
                    parsedInputs.push({
                        Category: row.Category.trim(),
                        SUM_of_account2: Number(row.SUM_of_account2),
                    });
                }
            })
            .on('end', async () => {
                try {
                    // 2. Save parsed data to Input collection
                    await Input.insertMany(parsedInputs);

                    // 3. Match Input.Category with Product.RowLabel
                    const matchedRows = [];
                    for (const input of parsedInputs) {
                        const product = await Product.findOne({ RowLabel: input.Category }).lean();
                        if (product) {
                            matchedRows.push({
                                Category: input.Category,
                                SUM_of_account2: input.SUM_of_account2,
                                ...product,
                                ToAccount: Number(req.query.ToAccount) || 0,
                                Ref: Number(req.query.Ref) || 0
                            });
                        }
                    }

                    // 4. Set CSV download headers
                    res.setHeader('Content-Disposition', 'attachment; filename=matched_results.csv');
                    res.setHeader('Content-Type', 'text/csv');

                    const filename = `matched_${Date.now()}_${uuidv4()}.csv`;
                    const fullPath = path.join(__dirname, '../output', filename); // make sure /output exists

                    // 5. Write matched data to response as CSV
                    const ws = fs.createWriteStream(fullPath);
                    const csvStream = format({ headers: true });
                    csvStream.pipe(ws);

                    matchedRows.forEach(row => {
                        const { _id, __v, RowLabel, ...cleanedRow } = row;
                        csvStream.write(cleanedRow);
                    });

                    csvStream.end();
                    ws.on('finish', () => {
                        res.download(fullPath, filename);
                    });

                } catch (err) {
                    console.error('Error during insert/match:', err);
                    res.status(500).json({ error: 'Error processing matched data.' });
                }
            });

    } catch (err) {
        console.error('File handling error:', err);
        res.status(500).json({ error: 'File upload failed.' });
    }
};
