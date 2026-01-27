class ResponseHelper {
    // Status codes
    oK = 200;
    created = 201;
    accepted = 202;
    badRequest = 400;
    unAuthorized = 401;
    forbidden = 403;
    notFound = 404;
    conflict = 409;
    gone = 410;
    unprocessableEntity = 422;
    iSError = 500;

    OK = async (res, success, message, data, meta, purpose) => {
        return res.status(this.oK).json({
            success,
            status: this.oK,
            message,
            data,
            meta: meta || null,
            error: null,
            purpose,
        });
    };

    Created = async (res, success, message, data, meta, purpose) => {
        return res.status(this.created).json({
            success,
            status: this.created,
            message,
            data,
            meta: meta || null,
            error: null,
            purpose,
        });
    };

    Accepted = async (res, message, data, meta, purpose) => {
        return res.status(this.accepted).json({
            success: true,
            status: this.accepted,
            message,
            data,
            meta: meta || null,
            error: null,
            purpose,
        });
    };

    BadRequest = async (res, message, purpose) => {
        return res.status(this.badRequest).json({
            success: false,
            status: this.badRequest,
            message,
            data: null,
            meta: null,
            error: null,
            purpose,
        });
    };

    UnAuthorized = async (res, message, purpose) => {
        return res.status(this.unAuthorized).json({
            success: false,
            status: this.unAuthorized,
            message,
            data: null,
            meta: null,
            error: null,
            purpose,
        });
    };

    Forbidden = async (res, message, purpose) => {
        return res.status(this.forbidden).json({
            success: false,
            status: this.forbidden,
            message,
            data: null,
            meta: null,
            error: null,
            purpose,
        });
    };

    NotFound = async (res, success, message, purpose) => {
        return res.status(this.notFound).json({
            success: success,
            status: this.notFound,
            message,
            data: null,
            meta: null,
            error: null,
            purpose,
        });
    };

    Conflict = async (res, message, data, purpose) => {
        return res.status(this.conflict).json({
            success: false,
            status: this.conflict,
            message,
            data,
            meta: null,
            error: null,
            purpose,
        });
    };

    Gone = async (res, message, purpose) => {
        return res.status(this.gone).json({
            success: false,
            status: this.gone,
            message,
            data: null,
            meta: null,
            error: null,
            purpose,
        });
    };

    UnprocessableEntity = async (res, message, purpose) => {
        return res.status(this.unprocessableEntity).json({
            success: false,
            status: this.unprocessableEntity,
            message,
            data: null,
            meta: null,
            error: null,
            purpose,
        });
    };

    ISError = async (res, errorMessage, purpose) => {
        return res.status(this.iSError).json({
            success: false,
            status: this.iSError,
            message: "Something went wrong!",
            data: null,
            meta: null,
            error: errorMessage,
            purpose,
        });
    };
}

export default new ResponseHelper();
