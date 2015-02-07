#VainJS - Chain validation
##Introduction
VainJS is a simple chain validation tool that allows fields to be verified and validated. This project was created so developers won't need to sift through multiple if statements to validate a single field.

### When should I use VainJS
* When you have single fields that require high levels of validation
* When your feilds are not coupled with each other
* When all conditions must be met. VainJS validates with AND operators.

##Setup
It's pretty straightforward to start VainJS. Just require it and use an instance.

	var validate = require('vain-js');

##Methods
VainJS provides a number of single value and multi value (arrays) methods
###Single value
`exists()` - checks if the value exists, values of 0 will return true.
`is(operator, compare_value, parameter_name)` - compares the value with a given compare value and operater. available operators include:
* `==`
* `!=`
* `>=`
* `>`
* `<`
* `<=`


If {$name} doesn't contain any value, null is returned. It's also possible to use a dot as a separator.

	{$foo.bar}

This has several implications as to what 'bar' actually is.

* check if $foo is an array and 'bar' is an element
* check if $foo is an object and 'bar' is a public property
* check if $foo is an object and 'bar' is a public method
* check if $foo is an object and 'getBar' is a public method

If none of the checks above give any results, null is returned as with simple variables.

###Modifiers
Modifiers are functions you can apply to variables. They can be chained and even contain
subvariables as arguments. They're executed from left to right.

	{$name|dump}
	{$name|uppercase}
	{$name|shuffle}
	{$name|truncate(10)}
	{$name|truncate($length)}

You can map your own functions/methods to modifiers. The only requirement is that they
need to be a valid <a href="http://www.php.net/callback">callback</a>. All the examples
below are ok and should work just fine.

	$environment = new Environment();
	$environment->mapModifier('strlen', 'strlen');
	$environment->mapModifier('date', array('MyClass', 'date'));
	$environment->mapModifier('date', array(new MyClass(), 'date'));
	$environment->mapModifier('test', function($value){ return test($value) });

###Arguments
Arguments can be either strings, integers or subvariables.

	{$name|substring(0, 5}}
	{$name|substring(0, $length)}
	{$name|sprintf('foo')}

As you can see. There's no need to encapsulate the subvariable with brackets.

###Subvariables
As seen in the example above, subvariables can be used in a nifty way. However there are some
restrictions. At this moment it's not possible to apply modifiers to subvariables. I'm planning
to add this in the future.

The same rules apply as with regular variables concerning the chaining of subvariables.

	{$name|sprintf($foo.bar.baz)}

##Comments
You can use single or multiline comments. The template code between the tags will not be rendered.

	{* single line comment *}
	{*
		multiline comment
	*}

##Including templates
The 'include' tag is used to include other templates. The path is always based on the
location of the template wherin the include tag resides. Following examples are ok.

	{% include 'template.tpl' %}
	{% include $template %}
	{% include $path . '/template.tpl' %}
	{% include '/home/spoon/' . $directory . '/template.tpl' %}

##Control structures
### If, elseif, else
There are quite a few possibilities. I've listed some of the most commonly used ones and if you
use your imagination you can come up with a lot more examples.

	{% if $name %} ... {% endif %}
	
	{% if $name == 'Davy' %} ... {% endif %}
	
	{% if $name != 'Davy' and $name != 'Erik' %} ... {% endif %}
	
As you can see subvariables can be used within if constructions. The same rules as with PHP are
applied to these constructions. You can use and combine the following expressions:

or, and, ==, !=, <, >, >=, <=, +, -, *, /, %

You can also use elseif and else constructions.

	{% if $name == 'Davy' %}
		...
	{% else %}
		...
	{% endif %}

Or you could just use one (ore more) elseif statement(s) which could look like this:

	{% if $name == 'Davy' %}
		...
	{% elseif $name == 'Dave' %}
		...
	{% elseif $name == 'Jelmer' %}
		...
	{% else %}
		...
	{% endif %}

### For loop
The for loop is used to loop over arrays or objects. The best way to explain is by showing an
example.

	{% for $dog in $animals %}
		{$dog}
	{% endfor %}

There are some custom loop specific variables you can access while doing loops.

* loop.count, number of items in the loop
* loop.first
* loop.last,
* loop.index, counter starting from 1.
* loop.key
* loop._parent, the parent context of this loop.

These extra variables might come in handy for template designers. A brief example below.

	{% if $users %}
		<ul>
			{% for $user in $users %}
				<li{% if $loop.first %} class="first"{% endif %}>
					{$loop.index} - {$user}
				</li>
			{% endfor %}
		</ul>
	{% endif %}

##Debug
You can see which variables are available in the current template by using the debug tag.
This will use var_dump to show the contents of the assigned template variables.

	{% debug %}

