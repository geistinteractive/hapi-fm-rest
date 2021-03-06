'use strict';

const transformers = require('./transformers');
const Boom = require('boom');

// tested in each export below
/* $lab:coverage:off$ */

/**
 *
 * @param err
 * @param data
 * @param reply
 * @param location the location of a new resource, only used for post
 * @returns {*}
 */
const replyer = (err, data, reply, location)=>{
    if(err) {
        if(err.statusCode === 401){
            return reply(Boom.unauthorized('invalid password'))
        }
        return reply(err);
    } else{
        let response = reply(data)
        if(location){
            response.created(location)
        }
        return response
    }
};


module.exports.dbnames = (request, reply) =>{

    let options =  transformers.dbnames(request);
    request.fms(options, (err, data)=>{

       return replyer(err, data, reply)
    });

};

module.exports.layoutNames = (request, reply) =>{


    let options =  transformers.layoutnames(request);

    request.fms(options, (err, data)=>{

        return replyer(err, data, reply)
    });

};

module.exports.scriptNames = (request, reply) =>{

    let options =  transformers.scriptnames(request);

    request.fms(options, (err, data)=>{
        return replyer(err, data, reply)
    });

};

module.exports.find = (request, reply) =>{

    let options =  transformers.find(request);

    request.fms(options, (err, data)=>{
        return replyer(err, data, reply)
    });

};

module.exports.read = (request, reply) =>{
    let idFieldName = request.server.plugins.fmsjsonapi.idField;
    let options =  transformers.findByIDField(request, idFieldName );

    request.fms(options, (err, data)=>{
        return replyer(err, data, reply)
    });

};


module.exports.new = (request, reply) =>{
    let idFieldName = request.server.plugins.fmsjsonapi.idField
    let options =  transformers.new(request);

    request.fms(options, (err, data)=>{
        let id = data.data[0][idFieldName]
        let location = '/' + request.params.db +'/'+ request.params.layout + '/' + id;
        return replyer(err, data, reply, location)
    });

};


module.exports.patch = (request, reply) =>{

    let idFieldName = request.server.plugins.fmsjsonapi.idField;
    let options = transformers.findByIDField(request, idFieldName);
    request.fms(options, (err, data )=>{
        if(err){
            return replyer(err)
        }{
            request.params.id = data.data[0]['recid'];
            let options = transformers.patch(request)
            request.fms(options, ( err, data ) => {
                return replyer(err, data, reply)
            })
        }
    });
};


module.exports.delete = (request, reply) =>{

    let idFieldName = request.server.plugins.fmsjsonapi.idField;
    let options = transformers.findByIDField(request, idFieldName);
    request.fms(options, (err, data )=>{
        if(err){
            return replyer(err)
        }{
            request.params.id = data.data[0]['recid'];
            let options = transformers.delete(request)
            request.fms(options, ( err, data ) => {
                return replyer(err, data, reply)
            })
        }
    });

};
/* $lab:coverage:on$ */