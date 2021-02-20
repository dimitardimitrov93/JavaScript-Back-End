const Course = require('../models/Course');

const create = (courseData, creatorId) => {
    let course = new Course({ ...courseData, creator: creatorId });
    return course.save();
};

const getAll = (search) => {
    if (search) {
        console.log(search)
        return Course
            .find({ title: { $regex: search, $options: 'i' } })
            .populate('usersEnrolled')
            .sort({ createdAt: -1 })
            .lean();
    } else {
        return Course
            .find({})
            .populate('usersEnrolled')
            .sort({ createdAt: -1 })
            .lean();
    }
};

const getOne = (id, userId) => {
    return Course
        .findById(id)
        .populate('usersEnrolled')
        .lean()
        .then(course => {
            course.hasEnrolled = course.usersEnrolled.some(x => x._id == userId);
            course.isCreator = course.creator == userId;
            return course;
        });
};

// const getTopThreeCourses = () => {
//     return Course
//         .find({})
//         .lean();
// };

const enrollUser = (courseId, userId) => {
    return Course.findById(courseId)
        .then(course => {
            course.usersEnrolled.push(userId);
            return course.save();
        });
};

const deleteCourse = (courseId) => {
    return Course.findByIdAndDelete(courseId);
};

const editCourse = (courseData, courseId) => {
    return Course.findByIdAndUpdate(courseId, courseData)
};

module.exports = {
    create,
    getAll,
    getOne,
    // getTopThreeCourses,
    enrollUser,
    deleteCourse,
    editCourse,
}