exports.validateProduct = (req, res, next) => {
    let isValid = true;
    
    if (req.body.name.trim().length < 2) {
        isValid = false;
    } else if (!req.body.imageUrl.trim()) {
        isValid = false;
    }

    if (isValid) {
        next();
    }
}