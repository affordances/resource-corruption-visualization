{
   "errors":{
      "message":"The URL was not found.",
      "payload":{
         "endpoints":{
            "hs_product":{
               "arguments":[

               ],
               "dataset":"hs_product_year",
               "returns":[
                  "product",
                  "year"
               ],
               "url_pattern":"\/data\/hs_product\/"
            },
            "hs_product_exporters":{
               "arguments":[
                  "product"
               ],
               "dataset":"country_hs_product_year",
               "returns":[
                  "location",
                  "year"
               ],
               "url_pattern":"\/data\/hs_product\/<int:product>\/exporters\/"
            },
            "location":{
               "arguments":[

               ],
               "dataset":"location_year",
               "returns":[
                  "location",
                  "year"
               ],
               "url_pattern":"\/data\/location\/"
            },
            "location_hs_products":{
               "arguments":[
                  "location"
               ],
               "dataset":"country_hs_product_year",
               "returns":[
                  "product",
                  "year"
               ],
               "url_pattern":"\/data\/location\/<int:location>\/hs_products\/"
            },
            "location_hs_products_by_partner":{
               "arguments":[
                  "location",
                  "partner"
               ],
               "dataset":"location_partner_hsproduct_year",
               "returns":[
                  "product",
                  "year"
               ],
               "url_pattern":"\/data\/location\/<int:location>\/hs_products_by_partner\/<int:partner>\/"
            },
            "location_partners":{
               "arguments":[
                  "location"
               ],
               "dataset":"location_partner_year",
               "returns":[
                  "partner",
                  "year"
               ],
               "url_pattern":"\/data\/location\/<int:location>\/partners\/"
            },
            "location_partners_by_hs_product":{
               "arguments":[
                  "location",
                  "product"
               ],
               "dataset":"location_partner_hsproduct_year",
               "returns":[
                  "partner",
                  "year"
               ],
               "url_pattern":"\/data\/location\/<int:location>\/partners_by_hs_product\/<int:product>\/"
            },
            "location_partners_by_sitc_product":{
               "arguments":[
                  "location",
                  "product"
               ],
               "dataset":"location_partner_sitcproduct_year",
               "returns":[
                  "partner",
                  "year"
               ],
               "url_pattern":"\/data\/location\/<int:location>\/partners_by_sitc_product\/<int:product>\/"
            },
            "location_sitc_products":{
               "arguments":[
                  "location"
               ],
               "dataset":"country_sitc_product_year",
               "returns":[
                  "product",
                  "year"
               ],
               "url_pattern":"\/data\/location\/<int:location>\/sitc_products\/"
            },
            "location_sitc_products_by_partner":{
               "arguments":[
                  "location",
                  "partner"
               ],
               "dataset":"location_partner_sitcproduct_year",
               "returns":[
                  "product",
                  "year"
               ],
               "url_pattern":"\/data\/location\/<int:location>\/sitc_products_by_partner\/<int:partner>\/"
            },
            "sitc_product":{
               "arguments":[

               ],
               "dataset":"sitc_product_year",
               "returns":[
                  "product",
                  "year"
               ],
               "url_pattern":"\/data\/sitc_product\/"
            },
            "sitc_product_exporters":{
               "arguments":[
                  "product"
               ],
               "dataset":"country_sitc_product_year",
               "returns":[
                  "location",
                  "year"
               ],
               "url_pattern":"\/data\/sitc_product\/<int:product>\/exporters\/"
            },
            "year":{
               "arguments":[

               ],
               "dataset":"year",
               "returns":[
                  "year"
               ],
               "url_pattern":"\/data\/year\/"
            }
         }
      },
      "status_code":404
   }
}

{
   "errors":{
      "message":"You have not specified a t level(?level=foo).",
      "payload":{
         "dataset_conf":{
            "facets":{
               "location":{
                  "field_name":"location_id",
                  "type":"location"
               },
               "year":{
                  "field_name":"year",
                  "type":"year"
               }
            },
            "slices":{
               "country_year":{
                  "levels":{
                     "location":[
                        "country"
                     ]
                  },
                  "lookup_strategy":"<atlas_core.slice_lookup.SQLAlchemyLookup object at 0x7f8a1c8e28d0>",
                  "schema":"<atlas_core.helpers.lima.LimaSchema object at 0x7f8a1c8e2908>"
               }
            }
         },
         "query":{
            "arguments":{

            },
            "dataset":"location_year",
            "endpoint":"location",
            "result":{
               "level":null,
               "name":"location",
               "type":"location"
            },
            "year_range":{
               "end":null,
               "start":null
            }
         }
      },
      "status_code":400
   }
}
