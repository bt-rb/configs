/* eslint-disable */
module.exports = {
  name: "@yarnpkg/plugin-exec",
  factory: function (require) {
    var plugin
    plugin = (() => {
      "use strict"
      var e = {
          240: (e, t, r) => {
            r.r(t), r.d(t, { default: () => p, execUtils: () => a })
            var a = {}
            r.r(a), r.d(a, { loadGeneratorFile: () => l, makeLocator: () => c, makeSpec: () => i, parseSpec: () => s })
            const o = require("@yarnpkg/core"),
              n = require("@yarnpkg/fslib")
            function s(e) {
              const { params: t, selector: r } = o.structUtils.parseRange(e),
                a = n.npath.toPortablePath(r)
              return {
                parentLocator: t && "string" == typeof t.locator ? o.structUtils.parseLocator(t.locator) : null,
                path: a,
              }
            }
            function i({ parentLocator: e, path: t, generatorHash: r, protocol: a }) {
              const n = null !== e ? { locator: o.structUtils.stringifyLocator(e) } : {},
                s = void 0 !== r ? { hash: r } : {}
              return o.structUtils.makeRange({ protocol: a, source: t, selector: t, params: { ...s, ...n } })
            }
            function c(e, { parentLocator: t, path: r, generatorHash: a, protocol: n }) {
              return o.structUtils.makeLocator(e, i({ parentLocator: t, path: r, generatorHash: a, protocol: n }))
            }
            async function l(e, t, r) {
              const { parentLocator: a, path: s } = o.structUtils.parseFileStyleRange(e, { protocol: t }),
                i = n.ppath.isAbsolute(s)
                  ? {
                      packageFs: new n.CwdFS(n.PortablePath.root),
                      prefixPath: n.PortablePath.dot,
                      localPath: n.PortablePath.root,
                    }
                  : await r.fetcher.fetch(a, r),
                c = i.localPath
                  ? {
                      packageFs: new n.CwdFS(n.PortablePath.root),
                      prefixPath: n.ppath.relative(n.PortablePath.root, i.localPath),
                    }
                  : i
              i !== c && i.releaseFs && i.releaseFs()
              const l = c.packageFs,
                p = n.ppath.join(c.prefixPath, s)
              return await l.readFilePromise(p, "utf8")
            }
            const p = {
              fetchers: [
                class {
                  supports(e, t) {
                    return !!e.reference.startsWith("exec:")
                  }
                  getLocalPath(e, t) {
                    const { parentLocator: r, path: a } = o.structUtils.parseFileStyleRange(e.reference, {
                      protocol: "exec:",
                    })
                    if (n.ppath.isAbsolute(a)) return a
                    const s = t.fetcher.getLocalPath(r, t)
                    return null === s ? null : n.ppath.resolve(s, a)
                  }
                  async fetch(e, t) {
                    const r = t.checksums.get(e.locatorHash) || null,
                      [a, n, s] = await t.cache.fetchPackageFromCache(e, r, {
                        onHit: () => t.report.reportCacheHit(e),
                        onMiss: () => t.report.reportCacheMiss(e),
                        loader: () => this.fetchFromDisk(e, t),
                        skipIntegrityCheck: t.skipIntegrityCheck,
                      })
                    return {
                      packageFs: a,
                      releaseFs: n,
                      prefixPath: o.structUtils.getIdentVendorPath(e),
                      localPath: this.getLocalPath(e, t),
                      checksum: s,
                    }
                  }
                  async fetchFromDisk(e, t) {
                    const r = await l(e.reference, "exec:", t)
                    return n.xfs.mktempPromise(async a => {
                      const s = n.ppath.join(a, "generator.js")
                      return (
                        await n.xfs.writeFilePromise(s, r),
                        n.xfs.mktempPromise(async r => {
                          if ((await this.generatePackage(r, e, s, t), !n.xfs.existsSync(n.ppath.join(r, "build"))))
                            throw new Error("The script should have generated a build directory")
                          return await o.tgzUtils.makeArchiveFromDirectory(n.ppath.join(r, "build"), {
                            prefixPath: o.structUtils.getIdentVendorPath(e),
                            compressionLevel: t.project.configuration.get("compressionLevel"),
                          })
                        })
                      )
                    })
                  }
                  async generatePackage(e, t, r, a) {
                    return await n.xfs.mktempPromise(async s => {
                      const i = await o.scriptUtils.makeScriptEnv({ project: a.project, binFolder: s }),
                        c = n.ppath.join(e, "runtime.js")
                      return await n.xfs.mktempPromise(async a => {
                        const s = n.ppath.join(a, "buildfile.log"),
                          l = n.xfs.createWriteStream(s),
                          p = l,
                          u = n.ppath.join(e, "generator"),
                          h = n.ppath.join(e, "build")
                        await n.xfs.mkdirPromise(u), await n.xfs.mkdirPromise(h)
                        const f = {
                          tempDir: n.npath.fromPortablePath(u),
                          buildDir: n.npath.fromPortablePath(h),
                          locator: o.structUtils.stringifyLocator(t),
                        }
                        await n.xfs.writeFilePromise(
                          c,
                          `\n          // Expose 'Module' as a global variable\n          Object.defineProperty(global, 'Module', {\n            get: () => require('module'),\n            configurable: true,\n            enumerable: false,\n          });\n\n          // Expose non-hidden built-in modules as global variables\n          for (const name of Module.builtinModules.filter((name) => name !== 'module' && !name.startsWith('_'))) {\n            Object.defineProperty(global, name, {\n              get: () => require(name),\n              configurable: true,\n              enumerable: false,\n            });\n          }\n\n          // Expose the 'execEnv' global variable\n          Object.defineProperty(global, 'execEnv', {\n            value: {\n              ...${JSON.stringify(
                            f
                          )},\n            },\n            enumerable: true,\n          });\n        `
                        )
                        let d = i.NODE_OPTIONS || ""
                        ;(d = d.replace(/\s*--require\s+\S*\.pnp\.c?js\s*/g, " ").trim()),
                          (i.NODE_OPTIONS = d),
                          l.write(
                            `# This file contains the result of Yarn generating a package (${o.structUtils.stringifyLocator(
                              t
                            )})\n`
                          ),
                          l.write("\n")
                        const { code: g } = await o.execUtils.pipevp(
                          process.execPath,
                          [
                            "--require",
                            n.npath.fromPortablePath(c),
                            n.npath.fromPortablePath(r),
                            o.structUtils.stringifyIdent(t),
                          ],
                          { cwd: e, env: i, stdin: null, stdout: l, stderr: p }
                        )
                        if (0 !== g)
                          throw (
                            (n.xfs.detachTemp(a),
                            new Error(`Package generation failed (exit code ${g}, logs can be found here: ${s})`))
                          )
                      })
                    })
                  }
                },
              ],
              resolvers: [
                class {
                  supportsDescriptor(e, t) {
                    return !!e.range.startsWith("exec:")
                  }
                  supportsLocator(e, t) {
                    return !!e.reference.startsWith("exec:")
                  }
                  shouldPersistResolution(e, t) {
                    return !1
                  }
                  bindDescriptor(e, t, r) {
                    return o.structUtils.bindDescriptor(e, { locator: o.structUtils.stringifyLocator(t) })
                  }
                  getResolutionDependencies(e, t) {
                    return []
                  }
                  async getCandidates(e, t, r) {
                    if (!r.fetchOptions)
                      throw new Error("Assertion failed: This resolver cannot be used unless a fetcher is configured")
                    const { path: a, parentLocator: n } = s(e.range)
                    if (null === n) throw new Error("Assertion failed: The descriptor should have been bound")
                    const i = await l(
                      o.structUtils.makeRange({
                        protocol: "exec:",
                        source: a,
                        selector: a,
                        params: { locator: o.structUtils.stringifyLocator(n) },
                      }),
                      "exec:",
                      r.fetchOptions
                    )
                    return [
                      c(e, {
                        parentLocator: n,
                        path: a,
                        generatorHash: o.hashUtils.makeHash("1", i).slice(0, 6),
                        protocol: "exec:",
                      }),
                    ]
                  }
                  async getSatisfying(e, t, r) {
                    return null
                  }
                  async resolve(e, t) {
                    if (!t.fetchOptions)
                      throw new Error("Assertion failed: This resolver cannot be used unless a fetcher is configured")
                    const r = await t.fetchOptions.fetcher.fetch(e, t.fetchOptions),
                      a = await o.miscUtils.releaseAfterUseAsync(
                        async () => await o.Manifest.find(r.prefixPath, { baseFs: r.packageFs }),
                        r.releaseFs
                      )
                    return {
                      ...e,
                      version: a.version || "0.0.0",
                      languageName: t.project.configuration.get("defaultLanguageName"),
                      linkType: o.LinkType.HARD,
                      dependencies: a.dependencies,
                      peerDependencies: a.peerDependencies,
                      dependenciesMeta: a.dependenciesMeta,
                      peerDependenciesMeta: a.peerDependenciesMeta,
                      bin: a.bin,
                    }
                  }
                },
              ],
            }
          },
        },
        t = {}
      function r(a) {
        if (t[a]) return t[a].exports
        var o = (t[a] = { exports: {} })
        return e[a](o, o.exports, r), o.exports
      }
      return (
        (r.d = (e, t) => {
          for (var a in t) r.o(t, a) && !r.o(e, a) && Object.defineProperty(e, a, { enumerable: !0, get: t[a] })
        }),
        (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
        (r.r = e => {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(e, "__esModule", { value: !0 })
        }),
        r(240)
      )
    })()
    return plugin
  },
}
