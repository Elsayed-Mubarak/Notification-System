// tests/acccountType.test.js
import mongoose from 'mongoose';
import request from 'supertest'
import app from "../app"
import UserNotification from "../models/User_Notification"
import User from "../models/User"
import Group from "../models/Group"

var notification;


afterAll(function (done) {
    mongoose.connection.close(function () {
        done();
    });

});


beforeAll(async (done) => {
    mongoose.connection.dropDatabase();
    done()
});

describe('User Operations', () => {

    it('should create user', async () => {
        const res = await request(app)
            .post('/v1/user')
            .send({
                "name": "Tony",
                "phone": "01273478941",
                "email": "anthony.nabil@hotmail.com",
                "language": "en"
            })
        expect(res.status).toEqual(200)
    })

    it('should create Group', async () => {
        const res = await request(app)
            .post('/v1/group')
            .send({
                "name": "Developers"
            })
        expect(res.status).toEqual(200)
    })

    it('should add users to group', async () => {
        let user = await User.findOne({})
        let group = await Group.findOne({})
        const res = await request(app)
            .post('/v1/userGroup')
            .send({
                "groupId": group._id,
                "userIds": [user._id]
            })
        expect(res.status).toEqual(200)
    })
});

describe('Notification Operations', () => {

    it('should create notification', async () => {
        let user = await User.findOne({})
        const res = await request(app)
            .post('/v1/notification')
            .send({
                "notificationSubject": { "en": "Hello !", "ar": "Hello !", "fr": "Hello !" },
                "notificationBody": { "en": "Hello !", "ar": "Hello !", "fr": "Hello !" },
                "notificationType": "PUSH_NOTIFICATION",
                "userId": user._id

            })
        expect(res.status).toEqual(200)
    })

});
