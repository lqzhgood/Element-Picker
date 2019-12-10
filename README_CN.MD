# Element-Picker
More user - friendly autonomous element selector

# DOC
[English](https://github.com/lqzhgood/Element-Picker)
[中文](https://github.com/lqzhgood/Element-Picker/blob/master/README_CN.MD)

# Demo
http://lqzhgood.github.io/Element-Picker/demo.html
![screenshots](https://lqzh.me/Element-Picker/screenshots.gif)


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
| Attribute  | Description  | Type | Accepted Values	 | Default |
| ------------ | ------------ |------------ |------------ |------------ |
| elm  |  可选择的最外层元素 | Element | -  | document.querySelector('body')|
| mode  |  选择样式  | string | 'target' 'cover' | 'target'|
| excludeElmName  |  需要排除的元素标签名 **小写**  | string[] | - | [] |
| switch  |  初始状态开关  | boolean | true false | true |
| events  |  自定义事件 | {key:'EVENT_NAME',fn:function(event){}}[] | -   | [] |

### Event
| Event Name  | Description  | Type |  Default |
| ------------ | ------------ |------------ |------------ |
| onInit  |  初始化完成事件 | Function |  - |
| onClick  |  点击选择元素事件 (bind this =>实例)| Function   | - |
| onHover  |  浮动选择元素事件 (bind this =>实例) | Function    | - |

### Method
| Method Name  | Description  | Parameters |
| ------------ | ------------ |------------ |
| on  |  打开 | - |
| off  |  关闭 | - |
| changeMode  | 更改样式 | mode |
| destroy  |  销毁 | - |