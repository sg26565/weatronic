package de.treichels.wea.bat64.config;

public class ConfigGroupList<T> extends ConfigList<T> {
	private String prefix;

	public ConfigGroupList() {
		setTypeinfo(32);
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(final String prefix) {
		this.prefix = prefix;
	}
}
