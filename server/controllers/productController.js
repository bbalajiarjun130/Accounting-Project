const Product = require('../model/Product');
const csv = require('csv-parser');
const fs = require('fs');

function normalizeAccountId(accountId) {
  if (!accountId) return null;
  const trimmed = accountId.toString().trim();
  return trimmed.padStart(6, '0');
}

// Function to fetch products from imported csv file
exports.importProducts = async (req, res) => {
    const results = [];
  
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        console.log('Results:' , results);
        try {
            const cleaned = results.filter(item =>
                item.RowLabel || item.AccountId || item.Memo
            );

            const filtered = [];
  
            for (let item of cleaned) {

                item.AccountId = normalizeAccountId(item.AccountId);

                console.log('Processing item:', item);

                const exists = await Product.findOne({
                  RowLabel: item.RowLabel || null,
                  AccountId: item.AccountId || null,
                  Memo: item.Memo || ""
                });
      
                if (!exists) filtered.push(item);
              }
      
              if (filtered.length > 0) {
                await Product.insertMany(filtered);
              }
      
              fs.unlink(req.file.path, () => {});
              return res.status(200).json({
                message: 'CSV processed',
                inserted: filtered.length,
                skipped: results.length - filtered.length
              });
        } catch (error) {
          // ✅ Only respond in this catch block
          return res.status(500).json({ error: error.message });
        }
      })
      .on('error', (err) => {
        // ✅ Also handle stream error properly
        console.error('CSV stream error:', err);
        return res.status(400).json({ error: 'Invalid CSV format' });
      });
  };


exports.createProduct = async (req, res) => {
    const { RowLabel, AccountId, Memo } = req.body;
    try {

        AccountId = normalizeAccountId(AccountId);

        const exists = await Product.findOne({ 
            RowLabel: RowLabel || null,
            AccountId: AccountId || null,
            Memo: Memo || ""
         });
        if (exists) {
            return res.status(400).json({ error: 'Product already exists' });
        }
      
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

