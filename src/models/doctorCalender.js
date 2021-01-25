import mongoose from 'mongoose'

const DoctorCalendarSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    appointment_date_at: { type: Date, default: undefined },
    time_zone: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
})

DoctorCalendarSchema.path('doctor').required(true, 'doctor cannot be blank')
// DoctorCalendarSchema.path('appointment_at').required(true, 'appointment  cannot be blank')

DoctorCalendarSchema.pre('remove', function(next) {
    next()
})

DoctorCalendarSchema.methods = {}

DoctorCalendarSchema.statics = {
    getById: function(_id) {
        return this.findOne({ _id }).exec()
    },

    list: function(options) {
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

export default mongoose.models.DoctorCalenda || mongoose.model('doctor_calender', DoctorCalendarSchema)
