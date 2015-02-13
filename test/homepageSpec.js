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

	it('should display a logo', function() {
		casper.thenOpen(host + '/', function() {
			expect('#logo').to.be.inDOM;
		});
	});

	it('should display mud splashes', function() {
		casper.thenOpen(host + '/', function() {
			expect('#mud').to.be.inDOM;
			expect('#mud2').to.be.inDOM;
			expect('#mud3').to.be.inDOM;
		});
	});

	it('should display a logo', function() {
		casper.thenOpen(host + '/', function() {
			expect('canvas').to.be.inDOM;
		});
	});

});