describe('Homepage', function() {

	var host = 'http://localhost:9999/'

	before(function() {
		casper.start(host);
	});

	it('should display PigPong!!', function() {
		casper.thenOpen('/', function() {
			expect('body').to.include.text('PigPong!!');
		});
	});

});