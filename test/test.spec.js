describe('all is defined and loaded', function() {
    it('Kl.js is defined', function(){
      expect(Kl).toBeDefined()
    });
    it('Kl.js Bind is defined', function(){
      expect(Kl.Bind).toBeDefined()
    });
    it('Kl.js Duplicate is defined', function(){
      expect(Kl.Duplicate).toBeDefined()
    });
    it('Kl.js LoopBind is defined', function(){
      expect(Kl.LoopBind).toBeDefined()
    });
    it('Kl.js Ajax is defined', function(){
      expect(Kl.Ajax).toBeDefined()
    });
});