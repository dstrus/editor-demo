var htmlEditor = ace.edit('htmlEditor');
htmlEditor.setTheme('ace/theme/monokai');
htmlEditor.session.setMode('ace/mode/html');
htmlEditor.setOption('enableEmmet', true);
htmlEditor.getSession().setUseWorker(false);

var cssEditor = ace.edit('cssEditor');
cssEditor.setTheme('ace/theme/monokai');
cssEditor.session.setMode('ace/mode/css');
cssEditor.getSession().setUseWorker(false);

function updatePreview(){
  var html = htmlEditor.getValue();
  var css = cssEditor.getValue();

	var iframe = document.createElement('iframe');

	var preview = document.getElementById('preview');
  var content = '<!doctype html><html><head><style>' + css + '</style></head><body>' +
                html + '</body></html>';

	preview.appendChild(iframe);

	iframe.contentWindow.document.open('text/htmlreplace');
	iframe.contentWindow.document.write(content);
	iframe.contentWindow.document.close();
}

updatePreview();

function handleKeyUp() {
  var preview = document.getElementById('preview');

  if (timeout) {
		clearTimeout(timeout);
		timeout = null;
	}

	preview.innerHTML = '';
	timeout = setTimeout(updatePreview, 500);
}

var timeout;

document.getElementById('htmlEditor').addEventListener('keyup', handleKeyUp);
document.getElementById('cssEditor').addEventListener('keyup', handleKeyUp);

function showHtml() {
  document.getElementById('cssEditor').style.display = 'none';
  document.getElementById('htmlEditor').style.display = 'block';

  document.getElementById('htmlButton').classList.add('active');
  document.getElementById('cssButton').classList.remove('active');
}

function showCss() {
  document.getElementById('htmlEditor').style.display = 'none';
  document.getElementById('cssEditor').style.display = 'block';

  document.getElementById('cssButton').classList.add('active');
  document.getElementById('htmlButton').classList.remove('active');
}

document.getElementById('htmlButton').addEventListener('click', showHtml);
document.getElementById('cssButton').addEventListener('click', showCss);
