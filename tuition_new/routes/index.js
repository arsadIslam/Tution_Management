import express from 'express'
import { home } from '../controllers/homeController.js'
import { login } from '../controllers/loginController.js'
import { signup } from '../controllers/signupController.js'
import { createStudent, fetchStudents } from '../controllers/studentController.js'
import { createFees, fetchFees, updateFees } from '../controllers/feesController.js'
import { generateMonthlyFees } from '../cron/generateFees.js'
import { authenticateToken } from '../middlewares/auth.js'
import { changePass } from '../controllers/changePassController.js'
import { createClass, getallClasses } from '../controllers/addClassController.js'

const router = express.Router()

router.get('/', home)
router.post('/login', login)

// SIGNUP ROUTE
router.post('/signup', signup)

router.get("/generate-fees", generateMonthlyFees)


router.use(authenticateToken)
router.post('/student/create', createStudent)
router.get('/students', fetchStudents)

router.post('/fees/create', createFees)
router.get('/fees', fetchFees)
router.get('/fees/:id', fetchFees)
router.put('/fee/update/:id', updateFees)
router.post('/changePassword', changePass)  
router.post('/addClass',createClass)
router.get('/getAllclass',getallClasses)


export default router
