const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const fieldErrors = error.details.map((err) => ({
                field: err.context.key,
                message: err.message,
            }));

            return res.status(422).json({
                success: false,
                status: 422,
                message: "Validation error",
                data: null,
                meta: null,
                error: fieldErrors,
                purpose: "Validation Middleware",
            });
        }

        next();
    };
};

export { validateBody };
