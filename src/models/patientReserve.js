import mongoose from 'mongoose'

const PatientReserveSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    appointment_at: { type: Date, default: undefined },
    chapter_one: { type: Boolean, default: false },
    chapter_two: { type: Boolean, default: false },
    chapter_three: { type: Boolean, default: false },
    chapter_four: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
})

PatientReserveSchema.path('doctor').required(true, 'doctor cannot be blank')
PatientReserveSchema.path('appointment_at').required(true, 'appointment  cannot be blank')


PatientReserveSchema.pre('remove', function(next) {
    next()
})


PatientReserveSchema.methods = {}


PatientReserveSchema.statics = {
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

export default mongoose.models.Post || mongoose.model('DoctorCalendar', PatientReserveSchema)
