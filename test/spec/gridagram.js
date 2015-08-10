
describe("Gridagram", function() { 

    describe("Basics", function() { 

        it("should have jQuery available", function() { 
            expect(jQuery).toBeDefined();
        });

        it("should exist", function() { 
            expect(jQuery.fn.gridagram).toBeDefined();
            expect(Gridagram).toBeDefined();
        });

    });

    describe("Usage", function() { 

        it("should error if input is not an array", function() { 
            expect(function() { $("body").gridagram(999); }).toThrow("not an array");
        });

    });

    describe("Grid", function() { 

        it("should make an empty grid", function() { 
            helper.addTestContainer("test");
            var data = [];
            $("#test").gridagram(data);
            expect($(".gridagram").length).toEqual(1);
            expect($(".widget").length).toEqual(0);
            helper.removeTestContainer("test");
        });

        it("should make a 2 panel grid", function() { 
            helper.addTestContainer("test");
            var data = [
                {title: "a1", body: "b1"}, 
                {title: "a2", body: "b2"}
            ];
            $("#test").gridagram(data);
            expect($(".gridagram").length).toEqual(1);
            expect($(".widget").length).toEqual(2);
            helper.removeTestContainer("test");
        });

        it("should maintain a 2 panel grid", function() { 
            helper.addTestContainer("test");
            var data = [
                {title: "a1", body: "b1"}, 
                {title: "a2", body: "b2"}
            ];
            $("#test").gridagram(data);
            $("#test").gridagram(data);
            $("#test").gridagram(data);
            expect($(".gridagram").length).toEqual(1);
            expect($(".widget").length).toEqual(2);
            //helper.removeTestContainer("test");
        });

    });

    describe("Content", function() { 

        it("should support static title and body", function() { 
            helper.addTestContainer("test");
            var data = [{title: "a", body: "b"}];
            $("#test").gridagram(data);
            expect($(".gridagram").length).toEqual(1);
            expect($(".widget").length).toEqual(1);
            expect($(".title-text").html()).toEqual("a");
            expect($(".body").html()).toEqual("b");
            helper.removeTestContainer("test");
        });

        it("should support dynamic title and body", function() { 
            helper.addTestContainer("test");
            var data = [{title: "aa", body: "bb"}];
            $("#test").gridagram(data, { 
                titleField: function(e) { return e.title; },
                bodyField: function(e) { return e.body; }
            });
            expect($(".gridagram").length).toEqual(1);
            expect($(".widget").length).toEqual(1);
            expect($(".title-text").html()).toEqual("aa");
            expect($(".body").html()).toEqual("bb");
            helper.removeTestContainer("test");
        });

    });

    describe("Options", function() { 

    });

});
