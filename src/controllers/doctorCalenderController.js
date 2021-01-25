import Base from './baseController'
import DoctorCalender from '../models/doctorCalender'
// import passport from "passport";
import user from '../models/user'
import moment from 'moment'

import doctorCalenderPart from '../models/doctorCalenderPart'
import mongoose from 'mongoose'
import doctorCalender from '../models/doctorCalender'

// import passport from 'passport'

export default class DoctorCalenderController extends Base {
    add = (req, res, next) => {
        user.findOne({ email: 'doctor2@gmail.com' }, function(err, us) {
            const model = DoctorCalender

            model.findOne({ doctor: us._id, appointment_date_at: req.body.params.appointment_date_at }, function(
                err,
                objSelect
            ) {
                let obj = objSelect

                if (!obj) obj = model(req.body.params)

                console.log('ob1j', obj)

                obj.doctor = us._id
                return obj.save((err, doc) => {
                    if (err) {
                        return this._respondError(res, err, 'doctor calender add')
                    }

                    const timeSelect = req.body.params.timeSelect
                    timeSelect.map(select => {
                        const modelPart = doctorCalenderPart
                        const objPart = modelPart()
                        objPart.doctor_calender = obj._id
                        objPart.time_limit_start = select.start
                        objPart.time_limit_end = select.end
                        objPart.user_id = null

                        objPart.save(error => {
                            if (error) {
                                // console.log(error)
                                return this._respondError(res, err, 'doctor calender part add')
                            }
                        })
                    })

                    return res.json({ status: 'success' })
                })
            })
        }).catch()
    }


    get = (req, res, next) => {
        const model = doctorCalender
        let doctorID = req.query.doctor
        const dateSelect = req.query.date

        let cc = new Date(dateSelect)
        let dateStart = cc.setHours('0', '0', '0')
        let dateEnd = cc.setHours('23', '59', '59')

        var ObjectId = mongoose.Types.ObjectId

        model.findOne(
            {
                doctor: new ObjectId(doctorID),
                appointment_date_at: {
                    $gte: new Date(dateStart),
                    $lte: new Date(dateEnd),
                },
            },
            function(err, doctorCalenderObj) {
                if (err) return res.end({ error: err })
                if (!doctorCalenderObj) return res.json({ status: 'fail' })
                doctorCalenderPart
                    .find({ doctor_calender: new ObjectId(doctorCalenderObj._id) })
                    .lean()
                    .exec(function(err, users) {
                        return res.end(JSON.stringify(users))
                    })
            }
        )
    }

    booking = (req ,res , next) => {
        const model = doctorCalenderPart;
        // console.log(req.body.params)
        let doctorCalenderPartId = req.body.params.doctorCalenderPartId



        model.findById(doctorCalenderPartId,function(err , obj){

            obj.user_id = '6007e6de4c713b5308a32dea'
            obj.is_reserved = true;
            obj.save()

            return res.json({ status: 'success' })

        })


    }
}
