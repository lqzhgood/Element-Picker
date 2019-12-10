# Element-Picker
More user - friendly autonomous element selector

# DOC
English
中文

# Demo
http://lqzhgood.github.io/Element-Picker/demo/index.html



# How to Use
```
<link rel="stylesheet" href="../dist/picker.min.css">
<script src="../dist/picker.min.js"></script>
<script>
	const p = new new Picker();
</script>
```



## Config
### Attribute
| Attribute  | Description  | Type | Accepted Values	 | Default
| ------------ | ------------ |
| elm  |  wrap elment | Element | -  | document.querySelector('body')
| mode  |  style mode  | string | 'target' 'cover' | 'target'
| excludeElmName  |  exclude element tag name **Lowercase**  | string[] | - | []
| switch  |  Initial state switch  | boolean | true false | true
| events  |  Custom events | {key:'EVENT_NAME',fn:function(event){}}[] | -   | []

### Event
| Event Name  | Description  | Type |  Default |
| ------------ | ------------ |
| onInit  |  Initialization finish event | Function |  -
| onClick  |  Click pick element event (bind this =>  instance )| Function   | -
| onHover  |  hover pick element event (bind this => instance ) | Function    | -

### Method
| Method Name  | Description  | Parameters |
| ------------ | ------------ |
| on  |  on | - |
| off  |  off | - |
| changeMode  | change style mode | mode |
| destroy  |  destroy | - |