package de.treichels.wea.bat64.config;

public class ConfigValue<T> extends ConfigElement {
	T value;

	public T getValue() {
		return value;
	}

	public void setValue(final T value) {
		this.value = value;
	}
}
