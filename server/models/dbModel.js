var dbpool = require('../config/dbConfig.js');
module.exports = (function(){
	return {
		select:function(callback){
      var selectQuery = 'SELECT * FROM businesses LIMIT 1000';
      dbpool.getConnection(function(err, connection){
        if(err){
          console.log(err)
        } else {
          connection.query(selectQuery, function(err, results){
            if(err){
              console.log(err)
              connection.release();
            } else {
              for(var j = 0; j < results.length; j++) {
                for(var k = 0; k < results.length; k++) {
                  if ( results[j].business_name < results[k].business_name ) {
                    var temp = results[k];
                    results[k] = results[j];
                    results[j] = temp;
                  }
                }
              }
              callback(null, results)
            }
          })
        }
      })
    },
    topBusinessInCountry: function(callback){
      var getTopBusinessInCountryQuery = "SELECT bi.annual_profit, a.country, b.business_name " + 
                                         "FROM businesses AS b " +
                                         "JOIN business_infos AS bi ON bi.business_id = b.id " + 
                                         "JOIN addresses AS a ON b.id = a.business_id " +
                                         "GROUP BY a.country "+
                                         "ORDER BY a.country, annual_profit desc " +
                                         "LIMIT 300";
                                         console.log(getTopBusinessInCountryQuery)
      dbpool.getConnection(function(err, connection){
        if(err) return console.log(err);
        connection.query(getTopBusinessInCountryQuery, function(err, results){
          if(err){
            console.log(err)
            connection.release();
          } else {
            connection.release();
            callback(null, results)
          }
        })
      })
    },
    insertBusiness:function (number){
      var generateBusinessesScript = new Promise(function(resolve, reject){
        var sqlQuery = 'INSERT INTO businesses (' +
          `business_name,` +
          `owner_first_name,` +
          `owner_last_name,` +
          `image_link,` +
          `updated_at,` +
          `created_at` +
          ') VALUES ';
        _(number).times(function(n) {
          // Get random point data
          var business_name = '"' + faker.company.companyName() + '"';
          var owner_first_name = '"' + faker.name.firstName() + '"';
          var owner_last_name = '"' + faker.name.lastName() + '"';
          var image_link = '"' + faker.image.imageUrl() + '"';
          var updated_at = 'NOW()';
          var created_at = 'NOW()';

          // Values.
          sqlQuery += '(' + 
            business_name + ',' +
            owner_first_name + ',' +
            owner_last_name + ',' +
            image_link + ',' +
            updated_at + ',' +
            created_at +
          ')';

          // Comma, except for last.
          if (n != count-1) sqlQuery += ',\n';
         
        });
        console.log(sqlQuery)
        resolve(sqlQuery)
      }); 
      generateBusinessesScript.then(function(sqlQuery){
        dbpool.getConnection(function(err, connection){
          if(err){
            console.log(err)
          } else {
            connection.query(sqlQuery, function(err, results){
              if(err){
                console.log(err)
                connection.release();
              } else {
                console.log("success")
                connection.release();
              }
            })
          }
        })
      })
    }
	}
})()