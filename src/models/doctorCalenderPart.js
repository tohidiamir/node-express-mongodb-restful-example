import mongoose from 'mongoose'

const DoctorCalendarPartSchema = new mongoose.Schema({
    doctor_calender: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor_calender' },
    time_limit_start: { type: Date, default: undefined },
    time_limit_end: { type: Date, default: undefined },
    is_reserved: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
    created_at: { type: Date , default: Date.now()},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
})

DoctorCalendarPartSchema.path('doctor_calender').required(true, 'doctor calender cannot be blank')
DoctorCalendarPartSchema.path('time_limit_start').required(true, 'time limit start cannot be blank')
DoctorCalendarPartSchema.path('time_limit_end').required(true, 'time limit end  calender cannot be blank')

DoctorCalendarPartSchema.pre('remove', function(next) {
    next()
})

DoctorCalendarPartSchema.methods = {}

DoctorCalendarPartSchema.statics = {
    getById: function (_id) {
        return this.findOne({_id}).exec()
    },

    list: function (options) {
        const criteria = options.criteria || {}
        const page = options.page || 0
        const limit = options.limit || 30
        return this.find(criteria)
            .sort({ created_at: -1 })
            .limit(limit)
            .skip(limit * page)
            .exec()
    },
}

export default mongoose.models.DoctorCalendarPart || mongoose.model('DoctorCalendarPart', DoctorCalendarPartSchema)
