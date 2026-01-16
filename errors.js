function parseDRFError(error) {
    if (!error) return 'An unknown error occurred';

    if (typeof error === 'string') return error;

    if (error.detail) return error.detail;
    if (error.error) return error.error;

    if (error.errors) {
        return Object.entries(error.errors)
            .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
            .join('\n');
    }

    return Object.entries(error)
        .map(([field, msgs]) =>
            Array.isArray(msgs)
                ? `${field}: ${msgs.join(', ')}`
                : `${field}: ${msgs}`
        )
        .join('\n');
}
// export { parseDRFError };