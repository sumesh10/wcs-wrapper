import express from 'express';
const app = express();
const port = "8000";

app.use(express.json());

app.get('/wcs/resources/stores/:storeId/users/:userId/attributes/:attributeName', (req, res) => {
    console.log("mockserver");
    const attributeName = req.params.attributeName;

    res.json({
        status: 'success',
        // eslint-disable-next-line perfectionist/sort-objects
        data: {
            attributeName: attributeName,
            value: 'abcde@gmail.com' 
        },
        
    });
});

app.listen(port, () => {
    console.log(`Mock WCS server running at http://localhost:${port}`);
});
