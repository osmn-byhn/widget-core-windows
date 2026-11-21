{
  "targets": [
    {
      "target_name": "widget_shield_native",
      "sources": [ "native/main.cpp" ],
      "include_dirs": [
        "native",
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "conditions": [
        ["OS=='win'", {
          "sources": [ "native/win32/WidgetManager.cpp" ],
          "libraries": ["dwmapi.lib", "user32.lib", "ole32.lib", "oleaut32.lib"],
          "msvs_settings": {
            "VCCLCompilerTool": {
              "AdditionalOptions": [ "/std:c++17" ]
            }
          }
        }]
      ],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS", "NODE_ADDON_API_CPP_EXCEPTIONS" ]
    },
    {
      "target_name": "widget_host",
      "type": "executable",
      "sources": [ "native/host.cpp" ],
      "include_dirs": [ "native" ],
      "conditions": [
        ["OS=='win'", {
          "sources": [ "native/win32/WidgetManager.cpp" ],
          "libraries": ["dwmapi.lib", "user32.lib", "ole32.lib", "oleaut32.lib"],
          "msvs_settings": {
            "VCCLCompilerTool": {
              "AdditionalOptions": [ "/std:c++17" ]
            }
          }
        }]
      ]
    }
  ]
}
