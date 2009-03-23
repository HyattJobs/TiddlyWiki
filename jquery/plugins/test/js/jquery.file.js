jQuery(document).ready(function() {
	module("jquery.file.load");

	test("load", function() {
		var actual, expected, filepath;

		actual = jQuery.file.load();
		expected = null;
		same(actual, expected, "returns null if no argument is specified");

		filepath = getDocumentPath() + "/sample.txt";
		actual = jQuery.file.load(filepath);
		expected = "lorem ipsum\n" +
			"dolor sit amet\n" +
			"\n" +
			" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~\n" +
			"\n" +
			"foo bar baz\n";
		same(actual, expected, "returns contents of specified file");

		filepath = "/null";
		actual = jQuery.file.load(filepath);
		expected = null;
		same(actual, expected, "returns null if the specified file does not exist");

		filepath = "sample.txt";
		actual = jQuery.file.load(filepath);
		expected = null;
		same(actual, expected, "returns null if specified file path is not absolute");
	});

	module("jquery.file.save");

	test("save", function() {
		var actual, expression, expected, str;
		var filepath = getDocumentPath() + "/savetest.txt";

		/* disabled as browser-level exceptions cannot be trapped
		expression = function() { jQuery.file.save(); };
		expected = "ReferenceError";
		raises(expression, expected, "raises exception if no argument is specified");
		*/

		/* disabled as browser-level exceptions cannot be trapped
		expression = function() { jQuery.file.save(filepath); };
		expected = "TypeError";
		raises(expression, expected, "raises exception if no content argument is specified");
		*/

		/* disabled as browser-level exceptions cannot be trapped
		expression = function() { jQuery.file.save("foo.txt", "sample content"); };
		expected = "ReferenceError";
		raises(expression, expected, "raises exception if specified file path is not absolute");
		*/

		str = "lorem ipsum\n" +
			"dolor sit amet\n" +
			"\n" +
			" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~\n" +
			"\n" +
			"foo bar baz\n" +
			(new Date).toString();
		jQuery.file.save(filepath, str);
		actual = jQuery.file.load(filepath);
		expected = str;
		same(actual, expected, "writes given contents to specified file");
		jQuery.file.save(filepath, ""); // teardown: blank file contents (deletion impossible)
	});

	// helper function to retrieve current document's file path
	var getDocumentPath = function() {
		var path = document.location.pathname;
		var pos = path.lastIndexOf("/");
		return path.substring(0, pos);
	};
});