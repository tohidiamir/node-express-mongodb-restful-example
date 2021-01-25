import * as express from 'express'

import UserController from './controllers/userController'
import DoctorCalenderController from './controllers/doctorCalenderController'

import { authRequired } from './utils/utils'
import { useIdentifyUser, useAuthErrorHandling } from './utils/utils'

export default function setRoutes(app) {
    const router = express.Router()

    const userCtrl = new UserController()
    const doctorCalenderCtrl = new DoctorCalenderController()

    router.use(useIdentifyUser)
    router.use(useAuthErrorHandling)

    // Users
    router.route('/signin').post(userCtrl.signin)
    router.route('/signup').post(userCtrl.signup)
    router.route('/users').get(authRequired, userCtrl.all, useAuthErrorHandling)
    router.route('/users/count').get(userCtrl.count)
    router.route('/users/:id').get(userCtrl.get)
    router.route('/users/:id').put(userCtrl.update)
    router.route('/users/:id').delete(userCtrl.delete)

    //Doctor Calender
    router.route('/doctor/calender/add').post(doctorCalenderCtrl.add)
    router.route('/doctor/get').get(userCtrl.getDoctor)
    router.route('/doctor/calender/get').get(doctorCalenderCtrl.get)
    router.route('/patient/booking').post(doctorCalenderCtrl.booking)

    // Apply the routes to our application with the prefix /api
    app.use('/api', router)
}
