const VALID_PRIORITIES = ['Low', 'Medium', 'High'];

const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: 'El parámetro "id" debe ser un número entero positivo.'
        });
    }

    next();
};

const validateTaskBody = (req, res, next) => {
    const { title, priority } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
            error: 'El campo "title" es requerido y no puede estar vacío.'
        });
    }

    if (!priority || !VALID_PRIORITIES.includes(priority)) {
        return res.status(400).json({
            error: `El campo "priority" debe ser uno de: ${VALID_PRIORITIES.join(', ')}.`
        });
    }

    next();
};

const validateIsCompleted = (req, res, next) => {
    const { isCompleted } = req.body;

    if (typeof isCompleted !== 'boolean') {
        return res.status(400).json({
            error: 'El campo "isCompleted" debe ser un booleano.'
        });
    }

    next();
};

module.exports = {
    VALID_PRIORITIES,
    validateId,
    validateTaskBody,
    validateIsCompleted
};