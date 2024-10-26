export async function genericErrorHandler(err, _req, res, _next) {
    console.error(err);

    const message = 'Internal Server Error';
    if (
        !err.status ||
        err.name === 'PrismaClientKnownRequestError'
    ) {
        return res.status(500).json({
            error: { message },
        });
    }

    return res.status(err.status).json({
        error: {
            message: err.message || message,
        },
    });
}
