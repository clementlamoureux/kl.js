describe('all is defined and loaded', function () {
  it('Kl.js is defined', function () {
    expect(Kl).toBeDefined()
  });
  it('Kl.js Bind is defined', function () {
    expect(Kl.Bind).toBeDefined()
  });
  it('Kl.js Duplicate is defined', function () {
    expect(Kl.Duplicate).toBeDefined()
  });
  it('Kl.js LoopBind is defined', function () {
    expect(Kl.LoopBind).toBeDefined()
  });
  it('Kl.js Ajax is defined', function () {
    expect(Kl.Ajax).toBeDefined()
  });
});
describe('Basic Usage', function () {
  beforeEach(function () {
    document.body.insertAdjacentHTML(
      'afterbegin',
      '<a id="testlink" href="#"></a>');
  });
  it('Kl.js Bind work as expected', function () {
    Kl.Bind("#testlink", {
      "content": "My Link text",
      "href": "http://mywebsite.com"
    });
    expect(document.getElementById('testlink').innerHTML).toBe('My Link text');
  });
  it('Kl.js Bind ', function () {
    Kl.Bind("#testlink", {
      "content": "My Link text",
      "href": "http://mywebsite.com"
    });
    expect(document.getElementById('testlink').innerHTML).toBe('My Link text');
  });
  it('Kl.js Bind style', function () {
    Kl.Bind("#testlink", {
      "content": "My Link text",
      "href": "http://mywebsite.com",
      "style": {
        "color": "blue",
        "textDecoration": "none",
        "backgroundImage": "url('https://www.google.fr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png')"
      }
    });
    expect(document.getElementById('testlink').innerHTML).toBe('My Link text');
    expect(document.getElementById('testlink').style.color).toBe('blue');
    expect(document.getElementById('testlink').style.backgroundImage).toBe('url(https://www.google.fr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png)');
  });
});
describe('Complex DOM', function () {
  beforeEach(function () {
    document.body.insertAdjacentHTML(
      'afterbegin',
      '<a class="testlink" href="">' +
      '<span class="first-item">' +
      '<ul>' +
      '<li class="withclass"></li>' +
      '<li></li>' +
      '</ul>' +
      '</span>' +
      '</a>');
  });
  it('Kl.js Bind work as expected', function () {
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
    expect(document.getElementsByClassName('testlink')[0].href).toBe('http://mywebsite.com/');
    expect(document.getElementsByClassName('withclass')[0].innerHTML).toBe('Test2');
    expect(document.querySelectorAll('.testlink ul>li:not(.withclass)')[0].innerHTML).toBe('Test');
  });
});