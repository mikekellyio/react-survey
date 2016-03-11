if(process.env.NODE_ENV == 'development'){
  module.exports = {
      api_url: 'http://localhost:4000/'
  };
}else{
  module.exports = {
      api_url: 'http://gametime-api.com'
  };
}
