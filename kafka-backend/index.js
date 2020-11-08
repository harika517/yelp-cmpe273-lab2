const connectDB = require('./config/db');
const connection = require('./kafka/connection');


// connect databse
connectDB();

// const allUsers = require('./services/customer.sevices/allUsers');
const profile = require('./services/customer.sevices/Users/profile')
const socialevents = require('./services/customer.sevices/SocialEvents/socialevents')
const restaurantsearch = require('./services/customer.sevices/RestaurantSearch/restaurantsearch')
const menuitems = require('./services/customer.sevices/MenuItems/menuitems')

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function(message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function(err, res) {
            console.log('after handle' + res);
            var payloads = [{
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: res
                }),
                partition: 0
            }];
            producer.send(payloads, function(err, data) {
                console.log(data);
            });
            return;
        });

    });
}

handleTopicRequest('profile', profile);
handleTopicRequest("socialevents", socialevents);
handleTopicRequest("restaurantsearch", restaurantsearch);
handleTopicRequest("menuitems", menuitems);

// handleTopicRequest('allUsers', allUsers);
// handleTopicRequest('allOtherUsers', allOtherUsers);