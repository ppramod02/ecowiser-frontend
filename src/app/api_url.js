
export default function getUrl(route) {
    const env = process.env.NODE_ENV
    if(env == "development"){
      return 'http://127.0.0.1:8000/' + route;
    } else {
     return 'https://ecowiser-server.onrender.com/' + route;
    }
}

