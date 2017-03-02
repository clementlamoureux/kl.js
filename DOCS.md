#DOCUMENTATION
===
## BASIC USAGE

Let's imagine you have a DOM like this

```html
<a class="testlink" href="">
</a>
```

You will bind your data :

```javascript
Kl.Bind(".testlink", {
    "content": "My Link text",
    "href": "http://mywebsite.com"
});
```
You could also apply style :

```javascript
Kl.Bind(".testlink", {
    "content": "My Link text",
    "href": "http://mywebsite.com",
    "style": {
        "color": "blue",
        "textDecoration": "none",
        "backgroundImage": "url('https://www.google.fr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png')"
    }
});
```

Now if you have a complex DOM : 

```html
<a class="testlink" href="">
    <span class="first-item">
        <ul>
            <li class="withclass"></li>
            <li></li>
        </ul>
    </span>
</a>
```
You will bind your data and your style like that :

```javascript
Kl.Bind(".testlink", {
    "href": "http://mywebsite.com",
    "style": {
        "textAlign":"center"
    },
    "ul>li": {
        "content": "Test",
        "style": {
            "fontSize": "2em"
        }
    },
    "li.withclass": {
        "content":"Test2"
    }
});
```

COMPLEX USAGE
---


### Loop Binding

From the DOM : 
```html
<a class="testlink" href="#"></a>
<a class="testlink" href="#"></a>
```
```javascript
// DATA SOURCE
var data = [{
  url: 'http://www.google.com'
},{
  url: 'http://www.yahoo.com'
}];

// LOOP BINDING

Kl.LoopBind(".testlink", data, function(item){
//MAP FUNCTION
    return {
      "href": item.url
    };
});
````

The result will be :

```html
<a class="testlink" href="http://www.google.com"></a>
<a class="testlink" href="http://www.yahoo.com"></a>
```
From the DOM : 
```html
<a class="testlink" href="#"></a>
<a class="testlink" href="#"></a>
<a class="testlink" href="#"></a>
```

The result will be :
```html
<a class="testlink" href="http://www.google.com"></a>
<a class="testlink" href="http://www.yahoo.com"></a>
<a class="testlink" href="#"></a>
```

So for the excluded elements you can do : 

```javascript
Kl.LoopBind(".testlink", data, function(item){
//MAP FUNCTION
    return {
      "href": item.url
    };
}, function(){
  //EXCLUDED MAP FUNCTION
  return {
    style: {
      display: "none"
    }
  }
});
````
From the DOM :
```html
<a class="testlink" href="#"></a>
```

The result will be (with auto duplicate) :
```html
<a class="testlink" href="http://www.google.com"></a>
<a class="testlink" href="http://www.yahoo.com"></a>
```
#### Animations

```html
<a class="testlink" href="http://www.google.com" style="opacity:0;transition: opacity 0.3s;"></a>
```
```javascript
Kl.Bind(".testlink", data, function(item){
//MAP FUNCTION
    return {
      "href": item.url,
      "style": {
        "opacity": 1
      }
    }
});
```

#### Ajax requests
```javascript
// Simple get request
Kl.Ajax('GET', '/api/sampleGet', {}, function (data) {
    //callback
});
// Simple get request with params
Kl.Ajax('GET', '/api/sampleGet', {'params': 'test'}, function (data) {
  //callback
});
// Simple post request with params
Kl.Ajax('POST', '/api/sampleGet', {'params': 'test'}, function (data) {
  //callback
});
// Post requests with custom headers
Kl.Ajax('POST', '/api/sampleGet', {'params': 'test'}, function (data) {
  //callback
}, [
{"name": "Authorization", "Basic " + btoa("admin:admin"}
]);

```
