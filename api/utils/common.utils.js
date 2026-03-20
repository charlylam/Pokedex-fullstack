export function checkBody(schema, body, res, next) {
    const validation = schema.validate(body);
    if (validation.error) {
        res.status(400).send(validation.error);
        return;
    }
    next();
}