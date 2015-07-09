<a name="RestBuddy"></a>
## RestBuddy
**Kind**: global class  

* [RestBuddy](#RestBuddy)
  * [new RestBuddy(name, spec, controller)](#new_RestBuddy_new)
  * [.middleware](#RestBuddy+middleware)
  * [.spec](#RestBuddy+spec)

<a name="new_RestBuddy_new"></a>
### new RestBuddy(name, spec, controller)
Create a RestBuddy instance


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of this resource (e.g., 'smurfs') |
| spec | <code>object</code> | Specification object |
| controller | <code>object</code> | Map of the actions to action handler functions |

<a name="RestBuddy+middleware"></a>
### restBuddy.middleware
Get the express middleware for serving this resource

**Kind**: instance property of <code>[RestBuddy](#RestBuddy)</code>  
**Read only**: true  
<a name="RestBuddy+spec"></a>
### restBuddy.spec
Get the resource specification, including added REST actions

**Kind**: instance property of <code>[RestBuddy](#RestBuddy)</code>  
**Read only**: true  
