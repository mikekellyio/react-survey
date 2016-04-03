if(process.env.NODE_ENV == 'development'){
  module.exports = {
      api_url: 'http://gametime-api.dev/api/',
  };
}else{
  module.exports = {
      api_url: '//gametime-api.herokuapp.com/api/'
  };
}
