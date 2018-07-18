
'use strict';

var Joi = require('joi');
var companies = require('../handlers/companies');

module.exports = [
    {
        path: '/api/companies',
        method: 'GET',
        config: {
            description: 'Get COMPANIES list',
            notes: 'Return COMPANIES list in the form of JSON',
            tags: ['api'],
            auth: {
                mode: 'try',
                // strategy: 'session',
                // scope: ['User']
            },
            handler: companies.getCompanies
        }
    },
    {
        path: '/api/companies/{company_id}',
        method: 'GET',
        config: {
            description: 'Get COMPANY by ID',
            notes: 'Return COMPANY by ID in the form of JSON',
            tags: ['api'],
            validate: {
                params: {
                    company_id: Joi.string().required()
                }
            },
            auth: {
                mode: 'try'
            },
            handler: companies.getCompanyById,
        }
    },
    {
        path: '/api/companies',
        method: 'POST',
        config: {
            description: 'Get a new COMPANY',
            notes: 'Return a new COMPANY in the form of JSON',
            tags: ['api'],
            auth: {
                //strategies: ['session'],
                scope: ['Admin', 'User']
                //mode: 'try'
            },
            handler: companies.addCompany
        }
    },
    {
        path: '/api/companies/{company_id}',
        method: 'DELETE',
        config: {
            description: 'Get message about deteted COMPANY',
            notes: 'Return message about deleted COMPANY in the form of JSON',
            tags: ['api'],
            validate: {
                params: {
                    company_id: Joi.string().required()
                }
            },
            auth: {
                //strategies: ['session'],
                scope: ['Admin', 'User']
                //mode: 'try'
            },
            handler: companies.deleteCompanyById
        }
    },
    {
        path: '/api/companies',
        method: 'PUT',
        config: {
            auth: {
                //strategies: ['session'],
                scope: ['Admin', 'User']
                //mode: 'try'
            },
            handler: companies.updateCompany
        }
    }
];
