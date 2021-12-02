// tests/acccountType.test.js
import mongoose from 'mongoose';
import request from 'supertest'
import app from "../app"
import Notification from "../models/Notification";
import User from "../models/User"
import Group from "../models/Group"
import UserGroup from "../models/User_Group"


afterAll(function (done) {
    mongoose.connection.close(function () {
        done();
    });

});


beforeAll(async (done) => {
    mongoose.connection.dropDatabase();
    done()
});

describe(`POST: /v1/user/`, () => {

    it(`Create User Should Return Status(201) `, async () => {
        const user = await request(app)
            .post(`/v1/user/`)
            .send({
                "name": "minahani",
                "phone": "01898768762",
                "email": "mina.sayed@gmail.com",
                "lang": "ar"
            });
        expect(user.body.message)
            .toBe("USER_CREATED_SUCESSIFULLY");
        expect(user.statusCode)
            .toEqual(201);
    });
})

describe(`POST: /v1/group/`, () => {

    it(`Create User Should Return Status(201) and req.body.createdGroup to equal {electric} `, async () => {
        const user = await request(app)
            .post(`/v1/group/`)
            .send({
                "name": "electric"
            });
        expect(user.body.message)
            .toBe("Group_CREATED_SUCESSIFULLY");
        expect(user.statusCode)
            .toEqual(201);
        expect(user.body.createdGroup)
            .toBe("electric");
    });
});

describe(`POST: /v1/user-group/`, () => {

    it(`Should Add Users To Specific Group `, async () => {

        const user = await User.findOne({});
        const group = await Group.findOne({});

        const res = await request(app)
            .post(`/v1/user-group/`)
            .send({
                "groupId": group._id,
                "userIds": [user._id]
            });

        const userGroup = await UserGroup.findOne({ userId: user._id, groupId: group._id });

        expect(res.body.message)
            .toBe("USER_Added_To_Group_SUCESSIFULLY");
        expect(res.statusCode)
            .toEqual(201);
        expect(res.body.usersGroup)
            .toEqual(expect.arrayContaining([
                {
                    "userId": user._id,
                    "groupId": group._id,
                    "_id": userGroup._id,
                }
            ]))
    });
})


describe(`POST: /v1/notification/`, () => {

    it(`Should create notification 
    then get Notifier Service using factory design pattern
    then add this notification to users
    then send notification by selected provider with PENDING status
    then publish message to apache kafka topic,
    and when consumer subscribe to targent notification,
    will update notification status to SENT
    then send notification to slack webhook.
     `, async () => {
        const user = await User.findOne({});
        const res = await request(app)
            .post(`/v1/notification/`)
            .send({
                "title": "elasticsearch_analyzer",
                "body": "elasticsearch_analyzer for arabic and english language",
                "type": "SMS",
                "userId": user._id
            });
        expect(res.body.message)
            .toBe("NOTIFICATION_CREATED_SUCESSIFULLY");
        expect(res.statusCode)
            .toEqual(201)

    })
})


describe(`GET: /v1/notification/`, () => {

    it(`Should Get All Notifications
     `, async () => {
        const notification = await Notification.find();
        const res = await request(app)
            .get(`/v1/notification/`)

        expect(res.body.message)
            .toBe("SUCESS");
        expect(res.statusCode)
            .toEqual(200)

    })
})