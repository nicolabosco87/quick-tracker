#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::api::dialog::ask;
use tauri::{CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};
use tauri::{Event, Manager};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let show = CustomMenuItem::new("show".to_string(), "Show");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(show);

    let system_tray = SystemTray::new().with_menu(tray_menu);

    #[allow(unused_mut)]
    let mut app = tauri::Builder::default()
        .on_window_event(|event| match event.event() {
            // tauri::WindowEvent::Focused(is_focused) => {
            //     // detect click outside of the focused window and hide the app
            //     if !is_focused {
            //         event.window().hide().unwrap();
            //     }
            // }
            tauri::WindowEvent::CloseRequested { api, .. } => {
                let app_handle = event.window().app_handle();

                // let app_handle = app_handle.clone();
                let window = app_handle.get_window("main").unwrap();
                // use the exposed close api, and prevent the event loop to close
                api.prevent_close();

                app_handle.get_window("main").unwrap().hide(); // .unwrap();

                // ask the user if he wants to quit
                // ask(
                //     Some(&window),
                //     "Tauri API",
                //     "Are you sure that you want to close this window?",
                //     move |answer| {
                //         if answer {
                //             // .close() cannot be called on the main thread
                //             // std::thread::spawn(move || {
                //             app_handle.get_window("main").unwrap().close().unwrap();
                //             // });
                //         }
                //     },
                // );
            }
            _ => {}
        })
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a left click");
            }
            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a right click");
            }
            SystemTrayEvent::DoubleClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a double click");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "show" => {
                    println!("Show init");

                    let window = app.get_window("main").unwrap();
                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                    };

                    // let window = app.get_window("main").unwrap();
                    // window.show();
                    // let window = match app.get_window("main") {
                    //     Some(window) => match window.is_visible().expect("winvis") {
                    //         true => return,
                    //         // {
                    //         // hide the window instead of closing due to processes not closing memory leak: https://github.com/tauri-apps/wry/issues/590
                    //         // window.hide().expect("winhide");
                    //         // window.close().expect("winclose");
                    //         // return window;
                    //         // }
                    //         false => window,
                    //     },
                    //     None => return,
                    // };

                    // #[cfg(not(target_os = "macos"))]
                    // {
                    //     println!("Show");
                    //     window.show().unwrap();
                    // }
                    // println!("Focus");

                    // window.set_focus().unwrap();
                }
                _ => {}
            },
            _ => {}
        })
        // .invoke_handler(tauri::generate_handler![greet])
        .build(tauri::generate_context!())
        .expect("error while running tauri application");
    // .run(|_app_handle, event| match event {
    //     tauri::RunEvent::ExitRequested { api, .. } => {
    //         api.prevent_exit();
    //     }
    //     _ => {}
    // });

    app.run(|app_handle, e| match e {
        // Application is ready (triggered only once)
        // Event::Ready => {
        //     let app_handle = app_handle.clone();
        //     app_handle
        //         .global_shortcut_manager()
        //         .register("CmdOrCtrl+1", move || {
        //             let app_handle = app_handle.clone();
        //             let window = app_handle.get_window("main").unwrap();
        //             window.set_title("New title!").unwrap();
        //         })
        //         .unwrap();
        // }

        // Triggered when a window is trying to close
        // tauri::WindowEvent::CloseRequested { label, api, .. } => {
        //     let app_handle = app_handle.clone();
        //     let window = app_handle.get_window(&label).unwrap();
        //     // use the exposed close api, and prevent the event loop to close
        //     api.prevent_close();
        //     // ask the user if he wants to quit
        //     ask(
        //         Some(&window),
        //         "Tauri API",
        //         "Are you sure that you want to close this window?",
        //         move |answer| {
        //             if answer {
        //                 // .close() cannot be called on the main thread
        //                 std::thread::spawn(move || {
        //                     app_handle.get_window(&label).unwrap().close().unwrap();
        //                 });
        //             }
        //         },
        //     );
        // }
        // tauri::RunEvent::Exit {
        //     label, api, event, ..
        // } => {
        //     let app_handle = app_handle.clone();
        //     let window = app_handle.get_window(&label).unwrap();
        //     // use the exposed close api, and prevent the event loop to close
        //     api.prevent_close();
        // }
        // tauri::RunEvent::WindowEvent { label, event, .. } => {

        // },

        // Keep the event loop running even if all windows are closed
        // This allow us to catch system tray events when there is no window
        tauri::RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
        }
        _ => {}
    })

    // tauri::Builder::default()
    //     .system_tray(system_tray)
    //     .run(tauri::generate_context!())
    //     .expect("error while running tauri application");

    // tauri::Builder::default()
    //     .build(tauri::generate_context!())
    //     .expect("error while building tauri application")
    //     .run(|_app_handle, event| match event {
    //         tauri::RunEvent::ExitRequested { api, .. } => {
    //         api.prevent_exit();
    //         }
    //         _ => {}
    //     });
}
