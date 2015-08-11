
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
            helper.removeTestContainer("test");
        });

        it("should order contents", function() { 
            helper.addTestContainer("test");
            var data = [ 
                {title: "a", body: "body"}, 
                {title: "f", body: "body"}, 
                {title: "c", body: "body"}, 
                {title: "d", body: "body"}, 
                {title: "g", body: "body"}, 
                {title: "b", body: "body"}, 
                {title: "e", body: "body"}, 
            ];
            $("#test").gridagram(data, { 
                widgetId: function(elem) { return elem.title },
                orderBy: function(a,b) { return (a.title > b.title) - (a.title < b.title) }
            });
            expect($(".gridagram").length).toEqual(1);
            expect($(".widget").length).toEqual(7);
            expect($($(".widget")[0]).find(".title-text").html()).toEqual("a");
            expect($($(".widget")[1]).find(".title-text").html()).toEqual("b");
            expect($($(".widget")[2]).find(".title-text").html()).toEqual("c");
            expect($($(".widget")[3]).find(".title-text").html()).toEqual("d");
            expect($($(".widget")[4]).find(".title-text").html()).toEqual("e");
            expect($($(".widget")[5]).find(".title-text").html()).toEqual("f");
            expect($($(".widget")[6]).find(".title-text").html()).toEqual("g");
            helper.removeTestContainer("test");
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
