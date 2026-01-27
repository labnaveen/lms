import Joi from "joi";

export const addEditClassSchema = Joi.object({
    class_name: Joi.string().max(150).required(),

    class_sections: Joi.array()
        .items(
            Joi.object({
                class_section_uuid: Joi.string().uuid().optional().allow(null, ""),
                class_section_name: Joi.string().max(150).required(),
                stream_uuid: Joi.string().optional().allow(null, ""),
            })
        )
        .optional(),

    class_sections_to_delete: Joi.array()
        .items(Joi.string().uuid()) // accepts array of UUIDs
        .optional()
        .allow(null),
});


// export const addEditClassSchema = Joi.object({
//     class_name: Joi.string().max(150).required(),

//     class_sections: Joi.array()
//         .items(
//             Joi.object({
//                 class_section_uuid: Joi.string().uuid().optional().allow(null, ""), // ✅ added
//                 class_section_name: Joi.string().max(150).required(),
//                 stream_uuid: Joi.string().optional().allow(null, ""),
//             })
//         )
//         .optional(),
// });


// export const addEditClassSchema = Joi.object({
//     class_name: Joi.string().max(150).required(),
//     class_sections: Joi.array()
//         .items(
//             Joi.object({
//                 class_section_name: Joi.string().max(150).required(),
//                 stream_uuid: Joi.string().optional().allow(null, ""),
//             })
//         )
//         .optional(),
// });

// export const addEditClassSectionSchema = Joi.object({
//     class_section_name: Joi.string().max(150).required(),
//     class_uuid: Joi.number().integer().required(),
//     stream_uuid: Joi.number().integer().optional().allow(null),
// });
