let host = []

let req = function() {
    let url = `http://${Date.now()}.sub.domain.com`
    var data = null;
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        let res = JSON.parse(this.responseText)
        let filter = res.filter((i) => {
            return host.indexOf(i) == -1
        })

        if (filter.length > 0) {
            host = host.concat(filter)
            req()
        } else {
			console.log(host)
			alert('done')
		}
      }
    });
    
    xhr.open("GET", url);
    xhr.send(data);
}

req()
