
    function Info(request, extra, javascriptConfig, output) {
        this.request = request;
        this.extra = extra;
        this.javascriptConfig = javascriptConfig;
        this.output = output;
    }
    
    function ModuleRequest(url, method, headers, httpBody) {
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.httpBody = httpBody;
    }
    
    function Extra(commands, extraInfo) {
        this.commands = commands;
        this.extraInfo = extraInfo;
    }
    
    function Commands(commandName, params) {
        this.commandName = commandName;
        this.params = params;
    }
    
    function JavascriptConfig(removeJavascript, loadInWebView, javaScript) {
        this.removeJavascript = removeJavascript;
        this.loadInWebView = loadInWebView;
        this.javaScript = javaScript;
    }
    
    function KeyValue(key, value) {
        this.key = key;
        this.value = value;
    }
    
    function Chapter(chapName, link,openInWebView) {
        this.chapName = chapName;
        this.link = link;
        this.openInWebView = openInWebView;
    }
    
    function Output(image, title, link, description, genres, field1, field2, field3, field4, chapters) {
        this.image = image;
        this.link = link;
        this.title = title;
        this.description = description;
        this.genres = genres;
        this.field1 = field1;
        this.field2 = field2;
        this.field3 = field3;
        this.field4 = field4;
        this.chapters = chapters;
    }
    
    function getStuff(array,match) {
            for (var x = 0 ; x< array.length;x++) {
                let data = array[x].innerText;
                if (data.includes(match)) {
                    return data.replace(match,'').trim();
                } 
            }
          }
    function getHtmlStuff(array,match) {
        for (var x = 0 ; x< array.length;x++) {
        let data = array[x].innerText;
        if (data.includes(match)) {
            return array[x];
        } 
    }
    }
    
    var savedData = document.getElementById('ketsu-final-data');
    var parsedJson = JSON.parse(savedData.innerHTML);
    let emptyKeyValue = [new KeyValue('', '')]; 
    var episodes = [];
    var type = 'Drama';
    var genres = [];
    var image = document.querySelector('.bigcontent .thumbook .thumb > img').src;
    image = new ModuleRequest(image, 'get', emptyKeyValue, null);
    var title = document.querySelector('.bigcontent .thumbook .thumb > img').title;
    var desc = document.querySelector('.entry-content > p').textContent.replaceAll('\\n','');
    genres = Array.from(document.querySelectorAll('.genxed > a')).map(g => g.textContent.trim());
    var etat = document.querySelector('.spe > span').textContent;
    var status = etat.replace('Status: ', '');
    var recupe = document.querySelectorAll('.eplister > ul > li');
    for (r of recupe) {
        var epi = 'Episode' + r.querySelector('a > .epl-num').textContent.replace('\\n', '');
        var link = r.querySelector('a').href;
        var chapitre = new Chapter(epi, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
        episodes.push(chapitre);
    }
    let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''),
    new Output(image, title, parsedJson.request, desc, genres, status, type, 'Coréen', 'Eps: ' + episodes.length, episodes.reverse()));
    var finalJson = JSON.stringify(infoPageObject);
    savedData.innerHTML = finalJson;
   