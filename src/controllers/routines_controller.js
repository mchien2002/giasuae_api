const routinesCtr = {}

routinesCtr.getCategoriesByIdNewClass = function (id) {
    return `SELECT ctg.* 
    FROM categories ctg
    JOIN categories_of_newclass ncctg ON ncctg._id_newclass = ${id}
    WHERE ctg._id = ncctg._id_category;`;
}

routinesCtr.getSubjectByIdNewClass = function (id) {
    return `SELECT s.* 
    FROM subjects s 
    JOIN subjects_of_newclass ncs ON ncs._id_newclass = ${id}
    WHERE s._id = ncs._id_subject;`
}

routinesCtr.getClassByIdNewClass = function (id) {
    return `SELECT c.* 
    FROM classes c 
    JOIN classes_of_newclass ncc ON ncc._id_newclass = ${id}
    WHERE c._id = ncc._id_class;`
}

routinesCtr.getSubjectByIdTutor = function (id) {
    return `SELECT s.* 
    FROM subjects s
    JOIN subjects_of_tutor tts ON tts._id_tutor = ${id}
    WHERE s._id = tts._id_subject;`;
}

routinesCtr.getClassByIdTutor = function (id) {
    return `SELECT c.* 
    FROM classes c 
    JOIN classes_of_tutor ttc ON ttc._id_tutor = ${id}
    WHERE c._id = ttc._id_class;`;
}

module.exports = routinesCtr;