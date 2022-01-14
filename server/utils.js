function createResult(error, data) {
    const result = {};
    if (error) {
      // if there is any error
      result["status"] = "error";
      // result.status = 'error'
  
      result["error"] = error;
      // result.error = error
    } else {
      // there is no error (success)
      result["status"] = "success";
      result["data"] = data;
    }
  
    return result;
  }

module.exports={
    createResult,
}