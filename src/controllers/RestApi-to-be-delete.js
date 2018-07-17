// class RstApi extends Component{
// export default class RstApi {
class RestApiToBeDelete {
// const RstApi = () => {

  // lst = () => {
  // lst: function() {
  lst() {
    let result = [];
    // fetch('http://forum-test-job.stripway.ru:4911/api/v1.0/messages')
    return fetch('http://forum-test-job.stripway.ru:4911/api/v1.0/messages')
      .then(response => response.json())
/*
      .then(json => {
        console.log(json)
        result = json
        // this.setState({
        //   data: json,
        //   animation: animation(json)
        // });
        return json
      })
*/
    // return result
  }

  lst2() {return [5,6,7]}
}

export default RestApiToBeDelete
// export default RstApi.lst2
// export { RstApi }
// export { RstApi.lst }