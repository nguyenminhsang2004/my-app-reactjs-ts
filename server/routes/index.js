var express = require('express')
var router = express.Router()

router.use('/api/auth', require(__dirname + '/auth'))
router.use('/api/users', require(__dirname + '/users'))
router.use('/api/posts', require(__dirname + '/posts'))
router.use('/api/notes', require(__dirname + '/notes'))
router.use('/api/dashboard', require(__dirname + '/dashboards'))

module.exports = router
