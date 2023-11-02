const scentDesc = (result) => {

    const scentDescMap = {};
    
    result.forEach((product) => {
        const { scent_desc, ...rest } = product;
        if (!(scent_desc in scentDescMap)) {
            scentDescMap[scent_desc] = { scent_desc, products: [] };
        }
        scentDescMap[scent_desc].products.push(rest);
    });
    
    const uniqueProducts = Object.values(scentDescMap).map(({ scent_desc, products }) => ({
        scent_desc,
        products,
    }));
    return uniqueProducts
}

module.exports = {
    scentDesc   
}