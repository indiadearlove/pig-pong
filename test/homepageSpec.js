describe('Homepage', function() {

	var host = 'http://localhost:9999'

	before(function() {
		casper.start(host);
	});

	it('should allow you to put your name in', function() {
		casper.thenOpen(host + '/', function() {
			expect('body').to.include.text('Enter your name:');
		});
	});

	it('should display a single player button', function() {
		casper.thenOpen(host + '/', function() {
			expect('body').to.include.text('Single Player');
		});
	});

	it('should display a multi player button', function() {
		casper.thenOpen(host + '/', function() {
			expect('body').to.include.text('Multi Player');
		});
	});

});